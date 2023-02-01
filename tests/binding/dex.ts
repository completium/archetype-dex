import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export class liquidity_key implements att.ArchetypeType {
    constructor(public tokenid: string, public owner: att.Address) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.string_to_mich(this.tokenid), this.owner.to_mich()]);
    }
    equals(v: liquidity_key): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): liquidity_key {
        return new liquidity_key(att.mich_to_string((input as att.Mpair).args[0]), att.Address.from_mich((input as att.Mpair).args[1]));
    }
}
export const token_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export const liquidity_key_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%tokenid"]),
    att.prim_annot_to_mich_type("address", ["%owner"])
], []);
export class token_value implements att.ArchetypeType {
    constructor(public addr: att.Address, public name: string, public xtzpool: att.Nat, public tokpool: att.Nat, public liqpool: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([this.addr.to_mich(), att.string_to_mich(this.name), this.xtzpool.to_mich(), this.tokpool.to_mich(), this.liqpool.to_mich()]);
    }
    equals(v: token_value): boolean {
        return att.micheline_equals(this.to_mich(), v.to_mich());
    }
    static from_mich(input: att.Micheline): token_value {
        return new token_value(att.Address.from_mich((input as att.Mpair).args[0]), att.mich_to_string((input as att.Mpair).args[1]), att.Nat.from_mich((input as att.Mpair).args[2]), att.Nat.from_mich((input as att.Mpair).args[3]), att.Nat.from_mich((input as att.Mpair).args[4]));
    }
}
export const token_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%addr"]),
    att.prim_annot_to_mich_type("string", ["%name"]),
    att.prim_annot_to_mich_type("nat", ["%xtzpool"]),
    att.prim_annot_to_mich_type("nat", ["%tokpool"]),
    att.prim_annot_to_mich_type("nat", ["%liqpool"])
], []);
export const liquidity_value_mich_type: att.MichelineType = att.prim_annot_to_mich_type("nat", []);
export type token_container = Array<[
    string,
    token_value
]>;
export type liquidity_container = Array<[
    liquidity_key,
    att.Nat
]>;
export const token_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("address", ["%addr"]),
    att.prim_annot_to_mich_type("string", ["%name"]),
    att.prim_annot_to_mich_type("nat", ["%xtzpool"]),
    att.prim_annot_to_mich_type("nat", ["%tokpool"]),
    att.prim_annot_to_mich_type("nat", ["%liqpool"])
], []), []);
export const liquidity_container_mich_type: att.MichelineType = att.pair_annot_to_mich_type("map", att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%tokenid"]),
    att.prim_annot_to_mich_type("address", ["%owner"])
], []), att.prim_annot_to_mich_type("nat", []), []);
const registertoken_arg_to_mich = (i: string, a: att.Address, n: string): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(i),
        a.to_mich(),
        att.string_to_mich(n)
    ]);
}
const deletetoken_arg_to_mich = (i: string): att.Micheline => {
    return att.string_to_mich(i);
}
const exchange_arg_to_mich = (tA: string, qA: att.Nat, tB: string, qB: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(tA),
        qA.to_mich(),
        att.string_to_mich(tB),
        qB.to_mich()
    ]);
}
const addLiquidity_arg_to_mich = (tA: string, qA: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(tA),
        qA.to_mich()
    ]);
}
const removeLiquidity_arg_to_mich = (tA: string, qL: att.Nat): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(tA),
        qL.to_mich()
    ]);
}
export class Dex {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(admin: att.Address, initialminted: att.Nat, params: Partial<ex.Parameters>) {
        const address = (await ex.deploy("./contracts/dex.arl", {
            admin: admin.to_mich(),
            initialminted: initialminted.to_mich()
        }, params)).address;
        this.address = address;
    }
    async registertoken(i: string, a: att.Address, n: string, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "registertoken", registertoken_arg_to_mich(i, a, n), params);
        }
        throw new Error("Contract not initialised");
    }
    async deletetoken(i: string, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "deletetoken", deletetoken_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async exchange(tA: string, qA: att.Nat, tB: string, qB: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "exchange", exchange_arg_to_mich(tA, qA, tB, qB), params);
        }
        throw new Error("Contract not initialised");
    }
    async addLiquidity(tA: string, qA: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "addLiquidity", addLiquidity_arg_to_mich(tA, qA), params);
        }
        throw new Error("Contract not initialised");
    }
    async removeLiquidity(tA: string, qL: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallResult> {
        if (this.address != undefined) {
            return await ex.call(this.address, "removeLiquidity", removeLiquidity_arg_to_mich(tA, qL), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_registertoken_param(i: string, a: att.Address, n: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "registertoken", registertoken_arg_to_mich(i, a, n), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_deletetoken_param(i: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "deletetoken", deletetoken_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_exchange_param(tA: string, qA: att.Nat, tB: string, qB: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "exchange", exchange_arg_to_mich(tA, qA, tB, qB), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_addLiquidity_param(tA: string, qA: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "addLiquidity", addLiquidity_arg_to_mich(tA, qA), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_removeLiquidity_param(tA: string, qL: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "removeLiquidity", removeLiquidity_arg_to_mich(tA, qL), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_admin(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Address.from_mich((storage as att.Mpair).args[0]);
        }
        throw new Error("Contract not initialised");
    }
    async get_initialminted(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.Nat.from_mich((storage as att.Mpair).args[1]);
        }
        throw new Error("Contract not initialised");
    }
    async get_token(): Promise<token_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[2], (x, y) => [att.mich_to_string(x), token_value.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    async get_liquidity(): Promise<liquidity_container> {
        if (this.address != undefined) {
            const storage = await ex.get_raw_storage(this.address);
            return att.mich_to_map((storage as att.Mpair).args[3], (x, y) => [liquidity_key.from_mich(x), att.Nat.from_mich(y)]);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: att.string_to_mich("\"NOT_ENOUGHT_LQT\""),
        r0: att.string_to_mich("\"SRC_EQ_DST\""),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\""),
        f1: att.pair_to_mich([att.string_to_mich("\"INVALID_CONDITION\""), att.string_to_mich("\"f1\"")])
    };
}
export const dex = new Dex();
