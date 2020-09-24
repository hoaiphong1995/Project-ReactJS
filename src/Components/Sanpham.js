import React, { Component } from "react";
// Con cua danh sach san pham
export default class SanPham extends Component {
    handleDetail = () => {
        this.props.detailProduct(this.props.product)
    }
    handleGiohang = () => {
        this.props.addCard(this.props.product)
    }
    render() {
        const { product } = this.props;
        return (
            <div className="col-sm-3">
                <div className="card">
                    <img className="card-img-top" src={product.hinhAnh} alt="" />
                    <div className="card-body">
                        <h4 className="card-title">{product.tenSP} </h4>
                        <button className="btn btn-success" onClick={this.handleDetail}>Chi tiết</button>
                        <button className="btn btn-danger" onClick={this.handleGiohang}>Thêm giỏ hàng</button>
                    </div>
                </div>
            </div>
        );
    }
}