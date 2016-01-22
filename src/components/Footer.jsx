import React from 'react'

export class Footer extends React.Component {
    render () {
        return (
            <footer className="page-footer light-blue">
                <div className="row">
                    <div className="col l5 s12">
                        <h5 className="white-text">OICR</h5>
                        <p  className="white-text">Informatics and Bio-Computing - Machine Learning Group</p>
                        
                    </div>
                    <div className="col l2 s8">
                        <h5 className="white-text">Resources</h5>
                        <ul>
                            <li><a className="white-text" href="https://oicr.github.io/PGMLaB">Web Site</a></li>
                            <li><a className="white-text" href="https://github.com/OICR/PGMLaB">GitHub</a></li>
                        </ul>
                    </div>
                    <div className="col l2 s8">
                        <h5 className="white-text">Contact</h5>
                        <ul>
                            <li><a className="white-text" href="#!">Adam Wright</a></li>
                            <li><a className="white-text" href="#!">Hossein Radfar</a></li>
                        </ul>
                    </div>
                    <div className="col l2 s8">
                        <img src={'../../assets/logos/logo_oicr_transparent.png'}  width="150px" alt="oicr logo" />
                    </div>
                </div>
            </footer>
        );
    };
}
