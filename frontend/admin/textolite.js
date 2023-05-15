
const qiwiPayments = async (msg, fileds) => {
    const fields = {
        amount: fileds["amount"],
        currency: fileds["currency"],
        comment: fileds["comment"],
    }  

    const billId = new QiwiBillPaymentsApi({
        privateKey: 'YOUR_PRIVATE_KEY',
        publicKey: 'YOUR_PUBLIC_KEY',
    }).generateId();
    
    const link = await qiwiApi.createPaymentForm(billId, fields)
    // Ну во первых тебе из функции наверное линк нужно вернуть не так ли?)
    return link
}

bot.onText(/\/addbalance/, async (msg) => {
    const chatId = msg.chat.id
    
    try {
        const phoneNumber = msg.contact.phone_number;

        const qiwiWallets = await QiwiApi.getWallets()
        const qiwiWalletId = qiwiWallets.accounts.find(account => account.alias === phoneNumber).qiwiWalletId
        await bot.sendMessage(chatId, "How much balance do u want to add?")

        bot.on('message', async (msg) => {
            const amount = parseFloat(msg.text)

            await QiwiApi.createTransaction(qiwiWalletId, amount)
        })
    } catch(error) {
        bot.sendMessage(chatId, 'An error occured. Please try again later')
    }
})