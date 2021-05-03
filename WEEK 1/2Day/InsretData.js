var arrData = new Array(10000).fill({
    "No_of_Coins": 100,
    "position": 4,
    "Recorded_Spin": false,
    "date": new Date()
})

db.collection.insertMany(arrData);