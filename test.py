from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
driver = webdriver.Firefox()

driver.get("https://www.geeksforgeeks.org/python-for-loops/")
wait = WebDriverWait(driver, 15)
elements = wait.until(EC.visibility_of_all_elements_located((By.CLASS_NAME, "language-python3")))
elements_string = []
f = open("codetypingtest/words.txt", "a")
for element in elements:
    f.write(element.text)
    f.write("\n"+"###"+"\n")
f.close()