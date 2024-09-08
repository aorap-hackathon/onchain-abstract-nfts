// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Adjust if using ERC721A
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SVGNFT is ERC721 {
    using Strings for uint256;

    mapping(uint256 => string) private _tokenSVGs;
    uint256 private _nextTokenId = 1; // Initialize the token ID counter


    constructor() ERC721("SVG NFT", "SVGNFT") {}

    function mint(address to, string memory svgData) public {
        uint256 tokenId = _nextTokenId;
        _safeMint(to, tokenId);
        _tokenSVGs[tokenId] = svgData;
        _nextTokenId++;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(
            ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory svg = _tokenSVGs[tokenId];
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "SVG NFT #',
                        tokenId.toString(),
                        '", "description": "On-chain SVG NFT", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(svg)),
                        '"}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    function getSVG(uint256 tokenId) public view returns (string memory) {
        require(
            ownerOf(tokenId) != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _tokenSVGs[tokenId];
    }
}