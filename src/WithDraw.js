import React, { useState } from "react";
import { Label, Input, Button, Form, FormGroup, Col } from "reactstrap";
import WithDrawModal from "./WithDrawModal";

const useAmountChange = () => {
    const [amount, setAmount] = useState(2560)
    return {
        amount, onChangeAmount: (e) => {
            const amount = e.target.value;
            const validAmount = amount.length && /^[0-9]+$/.test(amount)
            validAmount && setAmount(parseInt(amount))
            !amount.length && setAmount(0)
        }
    }
}

const useWithDraw = () => {
    const [isOpenModal, setOpenModal] = useState(false)
    const { amount, onChangeAmount } = useAmountChange()
    return { modal: { isOpenModal, setOpenModal }, amount, onChangeAmount }
}

const WithDraw = () => {
    const { modal, amount, onChangeAmount } = useWithDraw();
    return <>
        <Form onSubmit={e => {
            e.preventDefault();
            console.log("submitted")
        }}>
            <FormGroup>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Label for="amount">Email</Label>
                    <Input size="small" type="text" name="amount" id="amount" placeholder="leave a amount here to withdraw" value={amount} onChange={onChangeAmount} />
                </Col>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Button color="primary" onClick={() => {
                        modal.setOpenModal(true)
                    }}>WithDraw Amount</Button>
                </Col>
            </FormGroup>
        </Form>
        {modal.isOpenModal && <WithDrawModal amount={amount} close={() => {
            modal.setOpenModal(false)
        }}></WithDrawModal>}
    </>
}

export default WithDraw