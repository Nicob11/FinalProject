from api.models import BikePart, Bike, db


#funcion para obtener bicicleras de diferentes tipos de terreno y tamaños, recibe como parametros el tipo de terreno y el tamaño
def get_bike(terrain):
    bikes = []
    bike = Bike.query.filter_by(terrain=terrain).all()
    for b in bike:
        bikes.append(b.serialize())
    return bikes

# def get_bike_by_terrain_and_size(terrain, size):
#     bikes = []
#     bike = Bike.query.filter_by(terrain=terrain, size=size).all()
#     for b in bike:
#         bikes.append(b.serialize())
#         print(b.serialize())
#     return bikes

def get_bike_by_id(terrain, id):
    bike = Bike.query.filter_by(terrain=terrain, id=id).first()
    if not bike:
        return "Bike not found", 404
    return bike.serialize()

#funcion para obtener partes de bicicletas de diferentes tipos de terreno y tamaños, recibe como parametros el tipo de parte, el tipo de terreno y el tamaño
def get_part(terrain, size):
    parts = []
    element = BikePart.query.filter_by(terrain=terrain, size=size).all()
    if not element:
        return "Part not found", 404
    for p in element:
        parts.append(p.serialize())
    return parts

def get_all_parts():
    parts = []
    element = BikePart.query.all()
    for p in element:
        parts.append(p.serialize())
    return parts

def get_all_bikes():
    bikes = []
    element = Bike.query.all()
    for b in element:
        bikes.append(b.serialize())
    return bikes

def get_bikes_photos():
    photos = []
    element = Bike.query.all()
    for b in element:
        photos.append(b.serialize()["image"])
    return photos


def delete_parts_and_bikes():
    BikePart.query.delete()
    #Bike.query.delete()
    db.session.commit()
    return "All parts deleted", 200