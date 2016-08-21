woolies = open("woolies.csv", "r")
lines = woolies.readlines()
woolies.close()

def print_dict(d):
    s = "{"
    s += '"name": "' + d["name"] + '", '
    s += '"price": ' + str(d["price"])
    s += "}"
    return s

def split_woolies(line):
    s = line.split('"')
    if len(s) != 5:
        return None
    name = s[1]
    price = s[3]
    price = price.replace(',', '')
    #print(s, name, price)
    price = float(price[2:])
    return print_dict({"name" : name, "price" : price})


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
            pnp.append(print_dict({"name": names, "price" : price}))
        except:
            pass
    i += 1


f = open('woolies.json', 'w')
f.write('[\n')

for s in woolies:
    f.write('  ' + s)
    if s != woolies[-1]:
        f.write(',\n')

f.write('\n]\n')
f.close()
f = open('pnp.json', 'w')
f.write('[\n')

for s in pnp:
    f.write('  ' + s)
    if s != pnp[-1]:
        f.write(',\n')

f.write('\n]\n')
f.close()



