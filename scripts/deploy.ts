import { ethers } from "hardhat";
import { BigNumber } from "ethers";
async function main() {
  let [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  const pancakeswapRouter ="0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";

  const tokens = [
    "0x8babbb98678facc7342735486c851abd7a0d17ca",  //eth
    "0x8a9424745056eb399fd19a0ec26a14316684e274",  //DAI
    "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684",  //USDT
    "0xae13d989dac2f0debff460ac112a837c89baa7cd",  //WBNB
  ]

  const tokenAggregateContractAddress = [
    "0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7", //eth
    "0xE4eE17114774713d2De0eC0f035d4F7665fc025D", //Dai
    "0xEca2605f0BCF2BA5966372C99837b1F182d3D620", //usdt
    "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526", //wbnb
    "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa"  //busd
  ];
  const flashTokenAddress = "0x9331b55D9830EF609A2aBCfAc0FBCE050A52fdEa";  //busd address
  const SafeStakingContract = await ethers.getContractFactory("SafeStaking");
  const safeStaking = await SafeStakingContract.deploy();
  
  await safeStaking.connect(owner).setFlashTokenContract(flashTokenAddress);
  await safeStaking.connect(owner).setPancakeRouterContract(pancakeswapRouter);

  await safeStaking.connect(owner).modifyLockPeriods(90,200); // 2% divide by 10000
  await safeStaking.connect(owner).modifyLockPeriods(180,500); // 5% divide by 10000
  await safeStaking.connect(owner).modifyLockPeriods(365,1200); // 12% divide by 10000
  await safeStaking.connect(owner).modifyLockPeriods(750,2500); // 25% divide by 10000

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
