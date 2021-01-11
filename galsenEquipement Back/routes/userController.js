//Import
var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');

//Routes 
module.exports = {

    //On va ajouter des utilisateurs
    register: function (req, res) {

        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || username == null || password == null) {
            return res.status(404).json({ 'error': 'Veillez remplir tout les champs' });
        }

        models.Users.findOne({
            attributes: ['email'],
            where: { email: email }
        })
            .then(function (usersFound) {

                if (!usersFound) {
                //Insertion d'un nouveau utilisateur
                    try {
                        bcrypt.hash(password, 5, function (err, bcrypPassword) {
                            models.Users.create({
                                username: username,
                                email: email,
                                password: bcrypPassword,
                                //isAdmin: 0
                            })
                            return res.status(200).json({'success': 'Utilisateur creer'})
                        })

                    }
                    catch (e) {
                        return res.status(200).json({ 'error': 'Erreur lors de l\'ajout' });
                    }

                } else {
                    return res.status(409).json({ 'error': 'L\'utilisateur existe déja' });
                }

            })
            .catch(function (err) {
                return res.status(500).json({ 'error': 'Impossible de vérifier si l\'utilisateur existe' });
            });
    },

    //On va utiliser login et password avec des token
    login: function (req, res) {

        //Paramettres

        var email = req.body.email;
        var password = req.body.password;

        if( email== null || password == null){
            return res.status(400).json({'error' :'Veillez remplir les champs'});
        }
        //On recupère un seul utilisateur
        models.Users.findOne({
                where : {email: email}
        })
        .then(function(usersFound){
            if(usersFound){
                bcrypt.compare(password, usersFound.password, function(errBycrypt, resBycrypt){
                    //On test si ça corespond au mt passe hasher et on génère le token
                    if (resBycrypt){
                        return res.status(200).json({
                            'userId' : usersFound.id,
                            'token' : jwtUtils.generateTokenForUsers(usersFound)
                        });
              
                    }else {
                        return res.status(403).json({'error' :'Password invalide'});
                    }
                })

            }else {
                return res.status(404).json({'error' :'Email invalide'});
            }

        })
        .catch(function(err){
            return res.status(500).json({'error' :'Email ou Mot de passe invalide'});
        })

    }
}