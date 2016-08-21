woolies = open("woolies.csv", "r")
lines = woolies.readlines()
woolies.close()

def split_woolies(line):
    s = line.split('"')
    if len(s) != 5:
        return None
    name = s[1]
    price = s[3]
    price = price.replace(',', '')
    #print(s, name, price)
    price = float(price[2:])
    return {"name" : name, "price" : price}


woolies = list(map(split_woolies, lines[1:]))
woolies = list(filter(None, woolies))

pnp = open("pnp_food.csv", "r")
lines = pnp.read().split('"')
lines = list(filter(lambda x: x != ',', lines))
lines = list(filter(lambda x: x != '\n', lines))
pnp.close()
pnp = []

i = 1
while i < len(lines):
    if lines[i].startswith('R\n'):
        names = lines[i - 1]
        price = lines[i].split()
        try: 
            price = float(price[1] + '.' +  price[2])
            pnp.append({"name": names, "price" : price})
        except:
            pass
    i += 1


f = open('woolies.json', 'w')
f.write(str(woolies))
f.close()
f = open('pnp.json', 'w')
f.write(str(pnp))
f.close()



