import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Col, Table, Spinner } from "reactstrap";
import Axios from "axios";



const AskingPin = ({ close }) => {
    return <>
        <ModalHeader>Enter the pin in the box</ModalHeader>
        <ModalBody>
            <Col sm={{ size: 3, offset: 4 }}>
                <Input size={1} />
            </Col>
        </ModalBody>
        <ModalFooter>
            <Button color="primary" >WithDraw</Button>{' '}
            <Button color="secondary" onClick={close}>Cancel</Button>
        </ModalFooter>
    </>
}

const ShowWithDrawAmount = ({ notes, close }) => {
    return <>
        <ModalHeader>Take Your Amount</ModalHeader>
        <ModalBody>
            <Col sm={{ size: 10 }}>
                <Table>
                    <thead>
                        <tr>
                            <th>Note</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map(([note, count]) => <tr>
                            <td>{note}</td>
                            <td>{count}</td>
                        </tr>)}
                    </tbody>
                </Table>
            </Col>
        </ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={close}>Close</Button>
        </ModalFooter>
    </>
}

const useWithDrawModal = (amount) => {
    const [state, setState] = useState({ status: "loading", notes: null }); // {number: number}
    useEffect(() => {
        async function fetchNotes() {
            const notes = await Axios.post("/withdraw", { amount })
            console.log("useWithDrawModal ::: notes ::: ", notes)
            setState({ status: "fetched", notes: notes.data })
        }
        fetchNotes()
    }, [amount])
    return { state }
}

const WithDrawModel = ({ close, amount }) => {
    const { state } = useWithDrawModal(amount)
    return <Modal isOpen={true} keyboard={true}>
        {state.status === "fetched" && <ShowWithDrawAmount close={close} notes={Object.entries(state.notes)} />}
        {state.status === "loading" && <ModalBody><Spinner color="primary"></Spinner></ModalBody>}
    </Modal>
}

export default WithDrawModel