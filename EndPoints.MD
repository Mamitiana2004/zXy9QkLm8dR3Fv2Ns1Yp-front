
# EndPoints

## admin accomodation

* Login Responsable (POST)

/api/accounts/responsable/login/

* GET reservations pour <http://localhost:3000/responsable/accommodation/booking> :

/api/hebergement/reservations/{id_hebergement}/

* GET pour list client-reservation pour <http://localhost:3000/responsable/accommodation/guest> :

/api/hebergement/clients-et-chambres/{id_hebergement}/

* detail du responsable (GET, PATCH)

/api/accounts/detail-responsable/{id_responsable}/

* detail etablissement (GET, PUT, PATCH)

/api/hebergement/info/1/

PUT rah anova ny information rehetra
PATCH rah misy zavatra ts niova 

### Dashboard accomodation

* Total booking + Avaliable room + Total guest

/api/hebergement/1/stats/

* 

## super-admin

* GET list responsable par type (1 accomodation, 2 handcraft, 3 tour)

/api/accounts/responsables/type/1/

* GET detail du responsable

/api/accounts/detail-responsable/1/
