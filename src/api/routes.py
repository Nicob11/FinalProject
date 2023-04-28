"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import bcrypt
from .send_email import send_email
import os
from api.geting_api import add_part

api = Blueprint('api', __name__)

BIKE4U_EMAIL = os.environ.get('BIKE4U_EMAIL')
MESSAGE_FROM_BIKE4U = os.environ.get('MESSAGE_FROM_BIKE4U')
BIKE4U_NAME = os.environ.get('BIKE4U_NAME')

# POST crear usuari


@api.route("/signup", methods=["POST"])
def handle_singup():
    # ruta para crear usuarios nuevos en la base de datos que retorna el usuario serializado
    request_body = request.json
    # encriptamos la password
    coded_password = bcrypt.hashpw(request_body["password"].encode(
        "utf-8"), bcrypt.gensalt())
    new_user = User(
        name=request_body["name"],
        email=request_body["email"],
        password=coded_password,
        is_active=False
    )
    try:
        db.session.add(new_user)
        db.session.commit()
    except:
        return jsonify({"msg": "el email ya esta registrado bobo"}), 403
    return jsonify({"msg": f"Usuario creado: '{new_user.name}'"}), 200

# POST login


@api.route('/login', methods=['POST'])
# funcion para que el usuario pueda logearse en la pagina web(si esta registrado) sino enviara error 403
def handle_login():
    request_user = request.json
    user = User.query.filter_by(email=request_user["email"]).first()
    if user == None:
        return jsonify({"msg": "error en las credenciales"}), 403
    user_info = user.serialize()

    if not user.verify(request_user["password"].encode("utf-8")):
        return jsonify({"msg": "error en las credenciales!"}), 403

    login_token = create_access_token(identity=user_info)

    return jsonify({"login_token": login_token, "Name": user_info["name"]}), 200


# GET all users


@api.route('/allusers', methods=['GET'])
def handle_all_users():
    # funcion que devuelve todos los usuarios de mi base de datos
    all_user = User.query.all()
    list_of_users = []
    if all_user == None:
        return jsonify({"msg": "no hay usuarios en la base de datos"}), 404
    for user in all_user:
        list_of_users.append(user.serialize())
    return jsonify(list_of_users), 200

# GET user by ID


@api.route('/user/<int:id>', methods=['GET'])
def handle_get_user(id):
    # funcion que devuelve un usuario en particular mediante su ID
    user = User.query.filter_by(id=id).first()
    if user == None:
        return jsonify({"msg": "El usuario no existe"}), 404
    return jsonify(user.serialize()), 200


# DELETE user by ID
@api.route('/deleteuser/<int:id>', methods=['DELETE'])
def handle_delete_user(id):
    # funcion para borrar un usuario mediante su ID
    user_to_delete = User.query.filter_by(id=id).first()
    if user_to_delete == None:
        return jsonify({"msg": "El usuario no existe"}), 404
    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify(user_to_delete.serialize()), 200


# PUT user
@api.route('/user/<int:id>/edit', methods=['PUT'])
def handle_edit_user(id):
    # funcion para editar la informacion de un usuario en particular
    user_to_edit = User.query.filter_by(id=id).first()
    if user_to_edit == None:
        return jsonify({"msg": "El usuario no existe"}), 404
    request_body = request.json
    user_to_edit.name = request_body["name"]
    user_to_edit.email = request_body["email"]
    new_password = bcrypt.hashpw(
        request_body["password"].encode("utf-8"), bcrypt.gensalt())
    user_to_edit.password = new_password
    db.session.commit()
    return jsonify(user_to_edit.serialize()), 200


@api.route('/send-email', methods=['POST'])
def handle_send_message():
    # ruta para enviar email desde el formulario de contact us
    request_body = request.json
    print(request_body['email'])
    if request_body["email"]:
        return jsonify({"msg": "email is missing"}), 400
    email = request_body["email"]
    if request_body['message'] is None:
        return jsonify({"msg": "message is missing"}), 400
    message = request_body['message']
    name = request_body['name']
    send_email(BIKE4U_EMAIL, message, name)  # mensaje del usuario
    # mensaje de confirmacion por parte de bike4u
    send_email(email, MESSAGE_FROM_BIKE4U, BIKE4U_NAME)
    return jsonify(request_body)


@api.route('/test', methods=['GET'])
def handle_test():
    response = add_part()
    return jsonify(response)
