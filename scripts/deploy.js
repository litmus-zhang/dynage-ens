const main = async () =>
{
    const domainContractFactory = await hre.ethers.getContractFactory('Domains')
    const domainContract = await domainContractFactory.deploy("digital");
    await domainContract.deployed()

    console.log("Contract deployed to: ", domainContract.address)

    let txn = await domainContract.register("dynage", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain dynage.digital");

    txn = await domainContract.setRecord("dynage", "Am i a sun or a moon");
    await txn.wait()
    console.log("Set record for dynage.digital")

    const address = await domainContract.getAddress("banana");
    console.log("Owner of domain dynage:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address)
    console.log("Contract balance: ", hre.ethers.utils.formatEther(balance));
}

const runMain = async () =>
{
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }

}


runMain();