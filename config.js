module.exports={
	port: process.env.PORT || 3000,
	db: process.env.MONGODB || 'mongodb://localhost:27017/tecnicas_simulacion',
	SECRET_TOKEN: 'miclavedetokens'
}