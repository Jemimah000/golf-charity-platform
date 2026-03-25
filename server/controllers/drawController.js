exports.runDraw = async (req, res) => {
    const users = await User.find();

    let winner = users[Math.floor(Math.random() * users.length)];

    res.json({
        message: "Winner selected",
        winner: winner.email
    });
};