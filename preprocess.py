import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import requests
# import sqlite3
# import json

def get_year(row):
    return row['date'][0:4]

def add_one(row):
    return 1

def is_win(row):
    if row['home_score'] > row['away_score']:
        return 1
    else:
        return 0

def is_lose(row):
    if row['home_score'] < row['away_score']:
        return 1
    else:
        return 0

def get_countrycode(row):
    res = get_coords(row['Country'])
    if res != None:
        return res[0]
    else:
        return None

def get_lat(row):
    print(row)
    country = str(row['Country'])
    print(country)
    res = get_coords(country)
    if res != None:
        return res[1]
    else:
        return None

def get_lon(row):
    res = get_coords(row['Country'])
    if res != None:
        return res[2]
    else:
        return None

def graph1_preprocess():
    df = pd.read_csv("data/football.csv")
    df['year'] = df.apply(lambda row: get_year(row), axis=1)
    df['s'] = df.apply(lambda row: add_one(row), axis=1)
    years = df[['year', 's']]
    years = years.groupby('year')
    # print(years.head())
    years = years.sum()
    years.to_csv('graph_1.csv')
    return


def graph2_preprocess():
    df = pd.read_csv("data/football.csv")
    df['win'] = df.apply(lambda row: is_win(row), axis=1)
    df['lose'] = df.apply(lambda row: is_lose(row), axis=1)
    df['s'] = df.apply(lambda row: add_one(row), axis=1)
    df['Country'] = df['home_team']
    teams = df[['Country', 'win', 'lose', 's']]
    teams = teams.groupby('Country')
    # print(teams.head())
    teams = teams.sum()

    teams['Value'] = (teams['win'])/(teams['win']+teams['lose'])
    teams=teams.sort_values('Value', ascending=False)
    teams=teams[0:10]
    print(teams.head())
    # teams['Country'] = teams['home_team']
    teams = teams.drop(columns = ['win', 's', 'lose'])
    # teams = teams.drop('s')
    teams.to_csv('graph_2.csv')
    return


def graph3_preprocess():
    df = pd.read_csv("data/football.csv")
    df['year'] = df.apply(lambda row: get_year(row), axis=1)
    df = df.where(df['tournament']=='FIFA World Cup')
    df = df.where(df['year']>='2014')
    df = df.dropna()
    print(df)
    df['win'] = df.apply(lambda row: is_win(row), axis=1)
    df['lose'] = df.apply(lambda row: is_lose(row), axis=1)
    df['s'] = df.apply(lambda row: add_one(row), axis=1)
    df['Country'] = df['home_team']
    teams = df[['Country', 'win', 'lose', 's']]
    teams = teams.groupby('Country')
    # print(teams.head())
    teams = teams.sum()
    teams = teams.where(teams['win']>=3)
    teams = teams.dropna()

    teams['n'] = (teams['win'])/(teams['win']+teams['lose'])
    teams=teams.sort_values('n', ascending=False)
    teams=teams[0:20]
    print(teams.head())
    teams = teams.drop(columns = ['s', 'lose'])
    # teams['homelat'] = teams.apply(lambda row: get_lat(row), axis=1)
    # teams['homelon'] = teams.apply(lambda row: get_lon(row), axis=1)
    # teams = teams.dropna()
    teams.to_csv('graph_3.csv')
    return

def graph3_preprocess2():
    teams = pd.read_csv("graph_3.csv")
    teams['homelat'] = teams.apply(lambda row: get_lat(row), axis=1)
    teams['homelon'] = teams.apply(lambda row: get_lon(row), axis=1)
    teams = teams.dropna()
    teams.to_csv('graph_3v2.csv')


def get_coords(country_name):
    page = requests.get("https://developers.google.com/public-data/docs/canonical/countries_csv")
    soup = BeautifulSoup(page.text, 'html.parser')

    # Save these attributes: company name, stock symbol, price, change percentage, volume, HQ state
    tbl = soup.find('table')
    rows = tbl.findAll('tr')

    # this will be a list of rows will be stored as dictionaries
    data_1 = []

    for row in rows:
        cols = row.find_all('td')

        foo = False
        for col in cols:
            if col.text == country_name:
                foo = True
                break
        if foo:
            ret = []
            cols = row.find_all('td')
            for col in cols:
                ret.append(col.text)
            return ret[0:-1]
    return None


graph3_preprocess2()
# print(get_coords("France"))
