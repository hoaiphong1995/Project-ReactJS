import React, { Component } from "react";
import SanPham from "./Sanpham"


export default class DanhSachSanPham extends Component {
    // Cha cua san pham
    renderHTML = () => {
        const { listProduct } = this.props
        // Truyen lai value tu cai prop ong noi truyen lai cho con
        return listProduct.map(product => {
            return <SanPham key={product.maSP} product={product} detailProduct={this.props.detailProduct} addCard={this.props.addCard} />
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="row">{this.renderHTML()}</div>
                </div>
            </div>
        );
    }
}
