const RentalItemModel = require('./model/rentalItems');
const UserModel = require('./model/user');

class GenerateDb{

	constructor() {
		this.rentalItems = [{
          title: "Nice view on ocean",
          city: "San Francisco",
          street: "Main street",
          category: "condo",
          image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 4,
          shared: true,
          description: "Very nice apartment in center of the city.",
          dailyRate: 43
          },
          {
          title: "Modern apartment in center",
          city: "New York",
          street: "Time Square",
          category: "apartment",
          image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 1,
          shared: false,
          description: "Very nice apartment in center of the city.",
          dailyRate: 11
          },
          {
          title: "Old house in nature",
          city: "Spisska Nova Ves",
          street: "Banicka 1",
          category: "house",
          image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
          bedrooms: 5,
          shared: true,
          description: "Very nice apartment in center of the city.",
          dailyRate: 23
		  }
    ];
    this.users =[{
      username: "Test User1",
      email: "test1@gmail.com",
      password: "testtest"
    }, {
      username: "Test User2",
      email: "test2@gmail.com",
      password: "testtest"
    }]
	}

	async cleanDb() {
    await RentalItemModel.deleteMany({});
    await UserModel.deleteMany({});
	}

	pushDataToDb() {
    const newUserDocument1 = new UserModel(this.users[0]);
    const newUserDocument2 = new UserModel(this.users[1]);

    this.rentalItems.forEach((rentalItem) => { 
      const newRentalItemDocument = new RentalItemModel(rentalItem);
      newRentalItemDocument.user = newUserDocument1;
      newRentalItemDocument.save();

      newUserDocument1.rentals.push(newRentalItemDocument);
    })
    newUserDocument1.save();		
    newUserDocument2.save();
	}


	async seedDb() {
		await this.cleanDb();
		this.pushDataToDb();
	}
}

module.exports = GenerateDb;
