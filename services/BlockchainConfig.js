/** 
 * Copyright 2017–2018, LaborX PTY
 * Licensed under the AGPL Version 3 license.
 * @author Kirill Sergeev <cloudkserg11@gmail.com>
*/
const bunyan = require('bunyan'),
  _ = require('lodash')
  log = bunyan.createLogger({name: 'checkbot.config'}),
  amqp = require('amqplib');
class Config {

  constructor(addressFrom, addressTo, amount, serviceName, rabbitUri, restPort) {

    this.accounts = [addressFrom, addressTo];
    this.amount = amount;
    this.serviceName = serviceName;
    this.rabbitUri = rabbitUri;
    this.restPort = restPort;
    this.other = {};
  }

  getSignature()
  {
    return this.signature;
  }

  setSignature(signature) {
    this.signature = signature;
  }

  setOther(name, value) {
      this.other[name] = value;
  }

  setLaborxUrl(value) {
    this.laborxUrl = value;
  }

  getLaborxUrl() {
    return this.laborxUrl;
  }

  setLaborxRabbit(url) {
    this.laborxRabbitUrl = url;
  }


  setEthKey(key) {
    this.ethKey = key;
  }

  getEthKey() {
    return this.ethKey;
  }

  getOther(name, def = null) {
    return _.get(this.other, name, def);
  }

  setNetwork(network) {
    this.network = network;
  }

  getNetwork() {
    return this.network;
  }

  setTokenName(tokenName) {
    this.tokenName = tokenName;
  }

  getTokenName() {
    return this.tokenName;
  }

  setTokenAmount(tokenAmount) {
    this.tokenAmount = tokenAmount;
  }

  getTokenAmount() {
    return this.tokenAmount;
  }

  setTokenAccount(tokenAccount) {
    this.tokenAccount = tokenAccount;
  }

  getTokenAccount() {
    return this.tokenAccount;
  }
  setSymbol(symbol) {
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }

  getAccounts() {
    return this.accounts;
  }

  setSignUrl(url) {
    this.signUrl = url;
  }

  getSignUrl() {
    return this.signUrl;
  }
  getRestPort() {
    return this.restPort;
  }

  getTransferAmount() {
    return this.amount;
  }

  async createChannel() {
    let conn = await amqp.connect(this.rabbitUri)
      .catch(() => {
      log.error('rabbitmq is not available!');
      process.exit(0);
    });
    return await conn.createChannel();
  }


  async createProfileChannel() {
    let conn = await amqp.connect(this.laborxRabbitUrl)
      .catch(() => {
      log.error('rabbitmq is not available!');
      process.exit(0);
    });
    return await conn.createChannel();
  }

  getServiceName() {
    return this.serviceName;
  }

  setRestUrl(restUrl) {
    this.restUrl = restUrl;
  }

  getRestUrl() {
    return this.restUrl;
  }
}

module.exports  = Config;
