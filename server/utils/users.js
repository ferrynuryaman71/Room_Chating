[{
	id: '/#dsfa4gsdff',
	name: 'ferry',
	room: 'learning nodeJS'
}]

//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)



class Users {
	constructor() {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room}
		this.users.push(user)
		return user;
	}

	removeUser(id) {
		var user = this.getUser(id);

		if (user) {
			this.users.filter((user) => user.id !== id);
		}
		return user;
	}

	getUser(id) {
		return this.users.filter((user) => user.id === id)[0]
	}

	getUserList(room) {
		var users = this.users.filter((user) => user.room === room)
		var namesArray = users.map((user) => user.name)

		return namesArray;
	}
}

// class person {
// 	constructor(name, age) {
// 		this.name = name,
// 		this.age = age
// 	}
// 	getUserDescription() {
// 		return `${this.name} berusia ${this.age} tahun`
// 	}
// }

// var me = new person ('ferry', 20)
// var description = me.getUserDescription();
// console.log(description);

module.exports = {Users}