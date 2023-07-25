import React from 'react';

function MypageAccount(props) {
    const { open, close, header, passchk } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>
                        {header}
                        <button onClick={close}>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        <button onClick={passchk}>
                            확인
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
};

export default MypageAccount;