# curl -X GET http://localhost:3003/fin-customer/api/customer
# echo "\n"

# curl -X GET http://localhost:3003/fin-customer/api/customer/68ddef92c9fa3a96f54ead75
# echo "\n"

# curl -X POST -d '{"name":"Test User","dateOfBirth":"1992-03-15","memberNumber":99999,"interests":"gaming"}' -H "Content-Type: application/json" http://localhost:3003/fin-customer/api/customer
# echo "\n"

# curl -X PUT -d '{"_id":"68ddf36ab5aacbc92bed8e0b","name":"Test User Updated","dateOfBirth":"1992-03-15","memberNumber":9998,"interests":"movies, gaming, sports"}' -H "Content-Type: application/json" http://localhost:3003/fin-customer/api/customer
# echo "\n"

# curl -X PATCH -d '{"_id":"68ddf36ab5aacbc92bed8e0b","interests":"movies, gaming"}' -H "Content-Type: application/json" http://localhost:3003/fin-customer/api/customer

# curl -X DELETE http://localhost:3003/fin-customer/api/customer/68ddf36ab5aacbc92bed8e0b
# echo "\n"