import React, { useState } from "react";
import "../../../../style/shared/Modal.css";
import "../../../../style/report/ReportModal.css";
import ReportReasons from "../../../../services/utils/ReportReasons";
import { sendReport } from "../../../../services/reportService";
let report = require("../../../../assets/icons/report-v2.svg");
let titles = require("../../../../assets/json/titles.json");

function ReportModal(props) {

    const [reason, setReason] = useState('');
    const [detail, setDetail] = useState('');

    let options = [];
    Object.values(ReportReasons).forEach((element) => {
        options.push(
            <option value={element}>{element}</option>
        )
    });

    function onCancel() {
        setReason('');
        setDetail('');
        props.setOpenModal(false);
    }

    async function postReport(body) {
        try {
          const result = await sendReport(body);
          console.log(result);
          return result;
        } catch (error) {
          console.error('Error posting report:', error);
          return error;
        }
    }

    function onSubmit(){

        const body = {
            reviewId: props.reviewId,
            userId: 6,
            comment: detail,
            reason: reason
        }
        const response = postReport(body);
        if(response.status !== 500){
            //window.location.reload();
            onCancel();
        };
    }

    return ( 
        <>
            <div className="modal">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-title">
                        <img src={report.default}/>
                        <h1>
                            {titles['report-title']}
                        </h1>
                    </div>
                    <div className="modal-body">
                        <div className="input-element">
                            <label htmlFor="reason">Selecciona el motivo de tu reporte</label>
                            <select
                                type="text"
                                id="reason"
                                name="reason"
                                value={reason}
                                placeholder="Selecciona una opción..."
                                onChange={(e) => setReason(e.target.value)}>
                                {options}
                            </select>
                        </div>
                        <div className="input-element">
                            <label htmlFor="detail">Ingresa el detalle de tu reporte <span>(Opcional)</span></label>
                            <textarea
                                type="text"
                                id="detail"
                                name="detail"
                                value={detail}
                                maxLength={1200}
                                onChange={(e) => setDetail(e.target.value)}
                                placeholder="Ingresa el detalle..."/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={onCancel} className="secondary-button">Cancelar</button>
                        <button onClick={onSubmit} className="primary-button">Enviar reporte</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReportModal;