
# EndPoints

## admin accomodation

* Login Responsable (POST)

`/api/accounts/responsable/login/`

* GET reservations pour <http://localhost:3000/responsable/accommodation/booking> :

`/api/hebergement/reservations/{id_hebergement}/`

* GET pour list client-reservation pour <http://localhost:3000/responsable/accommodation/guest> :

`/api/hebergement/clients-et-chambres/{id_hebergement}/`

* detail du responsable (GET, PATCH)

`/api/accounts/detail-responsable/{id_responsable}/`

* detail etablissement (GET, PUT, PATCH)

`/api/hebergement/info/{id_hebergement}/`

PUT rah anova ny information rehetra
PATCH rah misy zavatra ts niova

### Dashboard accomodation

* Total booking + Avaliable room + Total guest (GET)

`/api/hebergement/{id_hebergement}/stats/`

* Booking par mois (GET)

`/api/hebergement/{id_hebergement}/reservations/mois/`

* Recent Bookings (GET)

`/api/hebergement/{id_hebergement}/recent-reservations/`

* Nombre reservation par jour de la semaine (GET)

`/api/hebergement/reservations-by-day/{id_hebergement}/`

## super-admin

* GET list responsable par type (1 accomodation, 2 handcraft, 3 tour)

`/api/accounts/responsables/type/{id_hebergement}/
`
* GET detail du responsable

`/api/accounts/detail-responsable/{id_hebergement}/`
