import { Bytes, Entrypoint, Key, Nat, Option, Or, pair_to_mich, Signature, string_to_mich, Ticket } from '@completium/archetype-ts-types'
import { blake2b, expect_to_fail, get_account, set_mockup, set_mockup_now, set_quiet } from '@completium/experiment-ts'

const assert = require('assert');

/* Contracts */

import { dex } from './binding/dex';


/* Accounts ----------------------------------------------------------------- */

const alice = get_account('alice');
const bob = get_account('bob');
const carl = get_account('carl');
const user1 = get_account('bootstrap1');
const user2 = get_account('bootstrap2');

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Scenarios --------------------------------------------------------------- */

describe('[DEX] Contracts deployment', async () => {
  it('DEX contract deployment should succeed', async () => {
    await dex.deploy(alice.get_address(), new Nat(1000), { as: alice })
  })
});
