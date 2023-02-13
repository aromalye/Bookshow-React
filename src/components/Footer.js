import logo from "../assets/images/bookshow.jfif"
import Table from 'react-bootstrap/Table';



const Footerx = () => {
    return(
        <>
        <div className="footer">
            <div className="m-3 text-center">
            <hr></hr>
                <img src={logo} />
            </div>
            <hr></hr>
            <div className="tablex">
            <thead>
                <tr>
                <th>ABOUT</th>
                <th>HELP</th>
                <th>POLICY</th>
                <th>SOCIAL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Contact us</td>
                <td>Payments</td>
                <td>Cencellation Policy</td>
                <td>Facebook</td>
                </tr>
                <tr>
                <td>About us</td>
                <td>Report issues</td>
                <td>Terms of user</td>
                <td>Twitter</td>
                </tr>
                <tr>
                <td>Careers</td>
                <td>Cancellation & returns</td>
                <td>Privacy</td>
                <td>Linkedin</td>
                </tr>
                <tr>
                <td>BookShow stories</td>
                <td>FAQ</td>
                </tr>
            </tbody>
            </div>
            <hr></hr>
        </div>
         <div style={{"backgroundColor":"#333545","height":"60px"}}>
            <p className="text-center text-muted py-3">&copy; 2023 aromalsatheesh@gmail.com Bookshow</p>
         </div>
         </>
    )
};
export default Footerx;