//************
//Install and Set Up Mongoose
const mongoose=require('mongoose');
require('dotenv').config();


const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

//************
//Create a Model (Person)
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);

//************
//Create and Save a Record of a Model (Person is the model)
function createAndSavePerson(done) {
    const mickeyMouse = new Person({ name: "Mickey Mouse", age: 200, favoriteFoods: ["pizza", "spaghetti", "hotdogs", "pineapple"] });

    mickeyMouse.save(function(err, data) {
        if (err)
            return console.error(err);
        done(null, data);
    });
}

//************
//Create Many Records with model.create (Person is the model)
const arrayOfPeople = [
  {name: "Kyle", age: 24, favoriteFoods: ["tacos","chicken"]},
  {name: "Andrea", age: 46, favoriteFoods: ["beef","cheese","beer"]},
  {name: "Pedro", age: 68, favoriteFoods: ["noodles","pizza","green beans","watermelon"]}
];

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};

//************
//Use model.find() fo Search Database (Person is model)
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

//************
//Use model.findOne() to Return a Single Matching Document from the database 
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, favoriteFood) {
    if (err) return console.log(err);
    done(null, favoriteFood);
  });
};

//************
//Use model.findById() to Search Database by _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personById) {
    if (err) return console.log(err);
    done(null, personById);
  });
};

//************
//Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function (err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//************
//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

//************
//Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedbytheId) => {
    if(err) return console.log(err);
    done(null, removedbytheId);
  });
};

//************
//Delete Many Documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

//************
//Chain search query helpers to narrow search results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
  .exec(function(err, deletedPersons) {
    return (err) ? done(err) : done(null, deletedPersons)
  })
};


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
