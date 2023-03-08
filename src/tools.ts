import * as dns from 'dns';
import * as net from 'net';
const dnsPromises = dns.promises;
import { Address } from './models'


/**
 * Resolves a given hostname to its IP address(es)
 * @param {string} hostname - The hostname to resolve
 * @returns {Address[]}
 * @throws {Error} - If the hostname is not valid or if there is an error while resolving the hostname
 */
async function dnsLookup(hostname) {
    const addresses = await dnsPromises.lookup(hostname, { all: true })
    return addresses.length ? Object.values(addresses)
        .filter((addr) => addr.family === 4)
        .map((addr) => {
            return { ip: addr.address }
        }) : [];
}

/**
 * Validates if a given IP address is a valid IPv4 address
 * @param {string} ip - The IP address to validate
 * @returns {boolean} - true if the IP address is valid, false otherwise
 */
function isValidIPv4(ip) {
    return net.isIPv4(ip);
}

/**
 * Validates if an input is a valid domain
 * @param {string} input - The domain to validate
 * @returns {boolean} - true if the domain is valid, false otherwise
 */
function isValidDomain(input) {
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/

    return regex.test(input);
}

export {
    dnsLookup,
    isValidIPv4,
    isValidDomain
};



