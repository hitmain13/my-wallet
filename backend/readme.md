// CRUD - User = {
//  id: string,
//     email: string, // nanoID
//     username: string,
//     password: string,
//     full_name: string,
//     created_at: string,
//     updated_at: string,
// }

user_profile: {
    user_id: string,
    full_name: string,
    location: string,
    phone: string,    
}

 BalanceProps = {
	amount: string,
	title: string,
    user_id: string,
    date: string,
	created_at: string,
    updated_at: string,
	description: string,
	frequency: string,
	type: string, // Expense | Gain
};

// @my-wallet:gains
[{"title":"teste","amount":"24","type":"gain","frequency":"eventual","date":"2022-06-12","description":""},{"title":"teste","amount":"24","type":"gain","frequency":"eventual","date":"2022-07-10","description":""}]

// @my-wallet:expenses
[{"title":"teste","amount":"24","type":"expense","frequency":"eventual","date":"2022-06-12","description":""},{"title":"teste","amount":"24","type":"gain","frequency":"eventual","date":"2022-07-10","description":""}]