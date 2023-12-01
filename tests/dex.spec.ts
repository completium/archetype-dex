import { Nat } from '@completium/archetype-ts-types'
import { get_account, set_mockup, set_quiet } from '@completium/experiment-ts'

/* Contracts */

import { dex } from './binding/dex';


/* Accounts ----------------------------------------------------------------- */

const alice = get_account('alice');

/* Endpoint ---------------------------------------------------------------- */

set_mockup()

/* Verbose mode ------------------------------------------------------------ */

set_quiet(true);

/* Scenarios --------------------------------------------------------------- */

describe('[DEX] Contracts deployment', () => {
  it('DEX contract deployment should succeed', async () => {
    await dex.deploy(alice.get_address(), new Nat(1000), { as: alice })
  })
});
