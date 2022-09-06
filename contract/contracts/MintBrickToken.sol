// contracts/MintBrickNFT.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract MintBrickToken is ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    // tokenId와 mapping된 token URI
    mapping(uint256 => string) public _tokenURIs;
    // tokenId와 mapping된 token 가격
    mapping(uint256 => uint256) public _nftTokenPrices;

    // 판매 등록된 토큰을 저장할 배열
    uint256[] public onSaleNftTokenArray;

    constructor() ERC721('BrickToken', 'BT') {}

    // tokenId에 해당하는 tokenURI를 리턴하는 함수
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return _tokenURIs[tokenId];
    }

    // NFT 발생 함수
    function mintNFT(string memory _tokenURI) public returns (uint256) {
        _tokenId.increment();
        uint256 tokenId = _tokenId.current();

        _tokenURIs[tokenId] = _tokenURI;

        _mint(msg.sender, tokenId);

        return tokenId;

        // string memory json = Base64.encode(
        //     bytes(
        //         string(
        //             abi.encodePacked(
        //                 '{"name": "Badge #',
        //                 Strings.toString(tokenId),
        //                 '", "description": "A concise Hardhat tutorial Badge NFT with on-chain SVG images like look.", "image": "data:image/svg+xml;base64,',
        //                 Base64.encode(bytes(output)),
        //                 '"}'
        //             )
        //         )
        //     )
        // );

        // output = string(
        //     abi.encodePacked('data:application/json;base64,', json)
        // );

        // return output;
    }

    // 토큰 가격을 가져오는 함수
    function getNftTokenPrice(uint256 tokenId) public view returns (uint256) {
        return _nftTokenPrices[tokenId];
    }

    // 발행한 토든 정보를 담는 구조체
    struct NftTokenData {
        uint256 nftTokenId;
        string nftTokenURI;
        uint256 price;
    }

    // 자신이 발행한 토큰 리스트를 리턴하는 함수
    function getNftTokens(address nftTokenOwner)
        public
        view
        returns (NftTokenData[] memory)
    {
        // nftTokenOwner가 가지고 있는 토큰 개수
        uint256 balanceLength = balanceOf(nftTokenOwner);

        // for 문을 돌면서 가지고 있는 토큰 정보를 담은 구조체 배열 생성
        NftTokenData[] memory nftTokenDatas = new NftTokenData[](balanceLength);
        for (uint256 i = 0; i < balanceLength; i++) {
            uint256 nftTokenId = tokenOfOwnerByIndex(nftTokenOwner, i);
            string memory nftTokenURI = tokenURI(nftTokenId);
            uint256 nftTokenPrice = getNftTokenPrice(nftTokenId);

            nftTokenDatas[i] = NftTokenData(
                nftTokenId,
                nftTokenURI,
                nftTokenPrice
            );
        }

        return nftTokenDatas;
    }

    // 판매 등록 함수
    function setSaleNftToken(uint256 tokenId, uint256 price) public {
        address nftTokenOwner = ownerOf(tokenId);

        // 호출한 주소가 토큰 소유자인지 확인
        require(nftTokenOwner == msg.sender, 'Caller is not nft token owner.');
        // 가격은 항상 0보다 커야한다.
        require(price > 0, 'Price is zero or lower.');
        // 만약 토큰 가격이 0이 아니라면 이미 판매되고 있기 때문에 판매등록을 하지 못한다.
        require(
            _nftTokenPrices[tokenId] == 0,
            'This nft token is already on sale.'
        );
        // 해당 주소에게 권한을 받았는지 확인
        require(
            isApprovedForAll(nftTokenOwner, address(this)),
            'nft token owner did not approve token.'
        );

        // 판매 가격 및 판매 등록 배열에 추가
        _nftTokenPrices[tokenId] = price;
        onSaleNftTokenArray.push(tokenId);
    }

    // 가격 미포함 판매 등록 리스트를 가져오는 함수
    function getSaleNftToken() public view returns (uint256[] memory) {}

    // 가격 포함 판매 등록 리스트를 가져오는 함수
    function getSaleNftTokens() public view returns (NftTokenData[] memory) {}

    // 판매 리스트에서 해당 토큰 삭제 함수
    function removeToken(uint256 tokenId) private {}

    // 구매 함수
    function buyNftToken(uint256 tokenId) public payable {}
}
