import React, { Component } from "react";
import DanhSachSanPham from "./DanhSachSanPham"
import Header from "./Header"
import Carousel from "./Carousel"
import Promotion from "./Promotion"
import Modal from "./modal";
import data from "./data.json"

export default class LiftingStateUpCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listProduct: data,
            detailProduct: data[0],
            listCard: []
        }
    }
    handlDetailProduct = (product) => {
        this.setState({
            detailProduct: product,
        })
    }
    // Tim vi tri 
    timViTri = id => {
        return this.state.listCard.findIndex(product => {
            return product.maSP === id;
        })
    }
    addCart = (product) => {
        const objProduct = {
            maSP: product.maSP,
            tenSP: product.tenSP,
            hinhAnh: product.hinhAnh,
            donGia: product.giaBan,
            soLuong: 1
        }
        const viTri = this.timViTri(objProduct.maSP);
        let listCard = [...this.state.listCard]
        if (viTri !== -1) {
            // Cap nhap so luong
            listCard[viTri].soLuong += 1;
        } else {
            // Them vao gio hang
            listCard = [...this.state.listCard, objProduct]
        }

        this.setState({
            listCard
        })
    }

    // Delete
    handleDelete = (product) => {
        const index = this.timViTri(product.maSP);
        if (index !== -1) {
            // Xoa SP trong listCard
            let listCard = [...this.state.listCard];
            listCard.splice(index, 1);
            this.setState({
                listCard: listCard
            })
        }
    }

    // Tang giam so luong
    handleTangGiamSL = (status, product) => {
        const index = this.timViTri(product.maSP)
        let listCard = [...this.state.listCard]
        if (index !== -1) {
            if (status) {
                listCard[index].soLuong += 1
            } else {
                if (listCard[index].soLuong > 1) {
                    listCard[index].soLuong -= 1
                }
            }
        }
        this.setState({
            listCard: listCard
        })
    }

    // Tong so luong san pham trong gio hang
    tongSL = () => {
        return this.state.listCard.reduce((tong, product) => {
            return tong += product.soLuong;
        }, 0)
    }
    render() {
        const { listProduct, detailProduct, listCard } = this.state
        return (
            <div>
                <Header />
                <Carousel />
                <div className="">
                    <button
                        className="btn btn-danger"
                        data-toggle="modal"
                        data-target="#modelId"
                    >
                        Giỏ hàng ({this.tongSL()})
          </button>
                </div>
                <DanhSachSanPham listProduct={listProduct} detailProduct={this.handlDetailProduct} addCard={this.addCart} />
                <Modal listCard={listCard} delete={this.handleDelete} tangGiamSL={this.handleTangGiamSL} />
                <div className="row">
                    <div className="col-sm-5">
                        <img className="img-fluid" src={detailProduct.hinhAnh} alt="" />
                    </div>
                    <div className="col-sm-7">
                        <h3>Thông số kỹ thuật</h3>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Màn hình</td>
                                    <td>{detailProduct.manHinh}</td>
                                </tr>
                                <tr>
                                    <td>Hệ điều hành</td>
                                    <td>{detailProduct.heDieuHanh}</td>
                                </tr>
                                <tr>
                                    <td>Camera trước</td>
                                    <td>{detailProduct.cameraTruoc}</td>
                                </tr>
                                <tr>
                                    <td>Camera sau</td>
                                    <td>{detailProduct.cameraSau}</td>
                                </tr>
                                <tr>
                                    <td>RAM</td>
                                    <td>{detailProduct.ram}</td>
                                </tr>
                                <tr>
                                    <td>ROM</td>
                                    <td>{detailProduct.rom}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <Promotion />
            </div>
        );
    }
}

