const bcrypt = require('bcrypt');
const myMongoose = require('mongoose');
const schema = myMongoose.Schema;

// myMongoose.set('useCreateIndex', true)
const userSchema = new schema ({
	username: { 
        type: String, 
        required: true, 
        minlength:[4, 'Min 4 characters required'], 
        maxlength:[32, ' Max 32 characters allowed']
    },
	email: { 
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        /*validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },*/
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        required: [true, "Email is required"],
        minlength:[4, 'Min 4 characters required'], 
        maxlength:[32, ' Max 32 characters allowed']
    }, 
    password: { 
        type: String, 
        required: [true, "Password is required"], 
        minlength:[4, 'Min 4 characters required'], 
        maxlength:[32, ' Max 32 characters allowed']
    },
	rentals: [{
        type: schema.Types.ObjectId, 
        ref: 'RentalItem'
    }],
    bookings: [{
        type: schema.Types.ObjectId, 
        ref: 'Booking'
    }]
});

userSchema.methods.isValidPassword = function(requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    const user = this;   
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
        });    
    });
    
})
module.exports = myMongoose.model('User', userSchema);

