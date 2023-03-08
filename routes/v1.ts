import express from 'express'
const router = express.Router()
import { dnsLookup, isValidIPv4, isValidDomain } from '../src/tools.js';
import { saveQuery, getQueries } from '../src/history.js'
import { ValidateIPRequest, ValidateIPResponse, HTTPError } from '../src/models'

/**
 * DNS lookup endpoint
 * @route GET /tools/lookup
 * @param {string} Domain name to look up
 * @returns {Query} 200 - Object containing domain name and resolved IP addresses, or 500 - Internal Server Error
 */
router.get('/tools/lookup', async (req, res, next) => {
  try {
    const domain = req.body.domain as string;
    if (!domain || !isValidDomain(domain)) {
      return res.status(400).json(<HTTPError>{
        message: 'Invalid domain input'
      })
    }
    const ips = await dnsLookup(domain);
    if (!ips.length) {
      return res.status(404).json(<HTTPError>{
        message: 'Not found'
      })
    }
    const query = {
      addresses: JSON.stringify(ips),
      client_ip: req.ip,
      created_at: Math.floor(Date.now() / 1000),
      domain: domain
    };
    await saveQuery(query);
    res.json(query);
  } catch (err) {
    res.status(400).json(<HTTPError>{
      message: err.message
    })
  }
});

/**
 * IP validation endpoint
 * @route POST /tools/validate
 * @param req.body {ValidateIPRequest}
 * @param res.body {ValidateIPResponse}
 * @returns {ValidateIPResponse|HTTPError}
 */
router.post('/tools/validate', (req, res) => {
  try {
    const ip = (<ValidateIPRequest>req.body).ip as string;
    if (!ip || typeof ip !== 'string') {
      return res.status(400).json(<HTTPError>{
        message: 'Invalid ip address input'
      })
    }
    if (isValidIPv4(ip)) {
      return res.json({ status: true});
    }
    res.json({ status: false});
  } catch (err) {
    res.status(400).json(<HTTPError>{
      message: err.message
    })
  }
});

/**
 * Query history endpoint
 * @route GET /history
 * @returns {Array} Array of 20 last DNS lookup queries
 */
router.get('/history', async (_, res) => {
  try {
    const queries = await getQueries(20)
    res.json(queries);
  } catch (err) {
    res.status(400).json(<HTTPError>{
      message: err.message
    })
  }
});

export { router }

