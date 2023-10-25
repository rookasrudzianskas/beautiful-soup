import requests
from bs4 import BeautifulSoup
import concurrent.futures

# URL for the Wizz Air flight search
base_url = "https://wizzair.com/en-gb#/booking/select-flight/{}/{}/2024-01-13/2024-01-16/1/0/0/null"

# List of countries and their corresponding departure airports
countries = {
    "Lithuania": "VNO",
    "Norway": "OSL"
}

# Dictionary to store prices for each country
country_prices = {}

def scrape_flight_price(country, airport_code):
    url = base_url.format(airport_code, "GNB")
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        price_element = soup.find("div", class_="flight-select__price__price")
        if price_element:
            price = price_element.get_text()
            country_prices[country] = price
        else:
            country_prices[country] = "Price not found"
    else:
        country_prices[country] = "Page not available"

# Use concurrent.futures to parallelize scraping
with concurrent.futures.ThreadPoolExecutor() as executor:
    futures = {executor.submit(scrape_flight_price, country, airport) for country, airport in countries.items()}
    concurrent.futures.wait(futures)

# Find the country with the cheapest flight
cheapest_country = min(country_prices, key=country_prices.get)

# Print the results
print("Flight Prices from Different Countries:")
for country, price in country_prices.items():
    print(f"{country}: {price}")

print(f"The cheapest option is from {cheapest_country} with a price of {country_prices[cheapest_country]}")
