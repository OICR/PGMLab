import React from 'react'

export class Footer extends React.Component {
    render () {
        return (
            <footer className="page-footer light-blue">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Company Bio</h5>
                        <p className="grey-text text-lighten-4">PGMLaB is a machine learning tool for performing learning and inference on probablistic graphical models. </p>
                    </div>
                    <div className="col l3 s12">
                        <h5 className="white-text">Resources</h5>
                        <ul>
                            <li><a className="white-text" href="https://oicr.github.io/PGMLaB">Web Site</a></li>
                            <li><a className="white-text" href="https://github.com/OICR/PGMLaB">GitHub</a></li>
                        </ul>
                    </div>
                    <div className="col l3 s12">
                        <h5 className="white-text">Contact</h5>
                        <ul>
                            <li><a className="white-text" href="#!">Adam Wright</a></li>
                            <li><a className="white-text" href="#!">Hossein Radfar</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    };
}
