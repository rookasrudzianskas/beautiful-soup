import requests
from bs4 import BeautifulSoup

# URL of the Wizz Air search results page for a specific route
url = "https://wizzair.com/en-gb#/booking/select-flight/VNO/GNB/2024-01-13/2024-01-16/1/0/0/null"

# List of countries to check
countries = ["DE", "FR", "IT", "PL", "HU", "RO", "LT", "LV", "EE", "CZ", "SK", "UA"]

# Dictionary to store prices for each country
country_prices = {}

for country_code in countries:
   # Append the country code to the URL
   url_with_country = url.replace("/VNO/", f"/{country_code}/")

   # Send a GET request to the URL
   response = requests.get(url_with_country)

   if response.status_code == 200:
       # Parse the HTML content of the page
       soup = BeautifulSoup(response.text, 'html.parser')

       # Extract the flight price from the page
       price_element = soup.find("div", class_="flight-select__price__price")
       if price_element:
           price = price_element.get_text()
           country_prices[country_code] = price
       else:
           country_prices[country_code] = "Price not found"
   else:
       country_prices[country_code] = "Page not available"

# Find the country with the cheapest flight
cheapest_country = min(country_prices, key=country_prices.get)

# Print the results
print("Flight Prices from Different Countries:")
for country, price in country_prices.items():
   print(f"{country}: {price}")

print(f"The cheapest option is from {cheapest_country} with a price of {country_prices[cheapest_country]}")

