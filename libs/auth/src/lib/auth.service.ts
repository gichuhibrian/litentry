import { Injectable } from '@nestjs/common';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress, signatureVerify } from '@polkadot/util-crypto';
import { ISignin } from '../types/types';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
    constructor(
        private jwtTokenService: JwtService,
    ) {}
    private isValidSignature (signedMessage: string, signature: string, address: string) {
        const publicKey = decodeAddress(address);
        const hexPublicKey = u8aToHex(publicKey);

        return signatureVerify(signedMessage, signature, hexPublicKey).isValid;
    }

    public async signin(params:ISignin) {
        const { message, signature, address } = params;
        const isValid = this.isValidSignature(message, signature, address);

        return isValid;
    }

    public async loginWithCredentials(address: string): Promise<string> {
        const accessToken = this.jwtTokenService.sign(address);
        return accessToken;
    } 
}
