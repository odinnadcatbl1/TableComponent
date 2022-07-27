import { IConfirmProps } from "../../types/types";
import "./Confirm.scss";

const Confirm: React.FC<IConfirmProps> = ({ message, onConfirm }) => {
    return (
        <div className="confirm">
            <div className="confirm__inner">
                <div className="confirm__message">{message}</div>
                <div className="confirm__actions">
                    <button
                        className="confirm__button confirm__button--yes"
                        onClick={() => onConfirm(true)}
                    >
                        Да
                    </button>
                    <button
                        className="confirm__button confirm__button--no"
                        onClick={() => onConfirm(false)}
                    >
                        Нет
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
