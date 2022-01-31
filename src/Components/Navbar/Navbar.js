import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FaTimes, FaBars } from 'react-icons/fa';
import { Button } from '../../globalStyles';
import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    NavIcon, 
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    LogOutBtn,
    MyProfile,
    NavItemBtn,
    NavBtnLink,
} from './Navbar.styles';



const Navbar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const { pathname } = useLocation();

    /* 구글 로그인 */
    const clientId = "528238867911-skdsf46rc72s3u92k6c4meciqrk3pmqh.apps.googleusercontent.com";

    const responseGoogle = (response) => {
        console.log(response);
        setLoggedIn(true); // 일단 로그인 처리
    };

    /* 반응형 */

    const handleClick = () => setClick(!click);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    }

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to="/">
                    <NavIcon />
                    CampUs
                </NavLogo>
                <MobileIcon onClick={handleClick}>
                    {click ? <FaTimes /> : <FaBars />}
                </MobileIcon>
                <NavMenu click={click}>
                    <NavItem>
                        <NavLinks to='/search' selected={pathname === "/search"}>
                            지도
                        </NavLinks>
                    </NavItem>
                    <NavItem>
                        <NavLinks to='/' selected={pathname === "/community"}>
                            커뮤니티
                        </NavLinks>
                    </NavItem>
                    {isLoggedIn ? (
                        <>
                        <NavItemBtn>
                            <LogOutBtn>
                                <GoogleLogout
                                    clientId={clientId}
                                    buttonText="Logout"
                                    // onLogoutSuccess={logout}
                                ></GoogleLogout>
                            </LogOutBtn>
                        </NavItemBtn>
                        <NavItemBtn>
                            <MyProfile to='/member'>
                                <Avatar size="large" icon={<UserOutlined />} />
                            </MyProfile>
                        </NavItemBtn>
                        </>
                    ) : (
                        <NavItemBtn>
                            {button ? (
                                <GoogleLogin
                                    clientId={clientId}
                                    render={(renderProps) => (
                                        <NavBtnLink to='/' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                            <Button primary>Log In</Button>
                                        </NavBtnLink>
                                    )}
                                    buttonText="구글 계정으로 로그인"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                    isSignedIn={true}
                                />
                            ) : (
                                <GoogleLogin
                                    clientId="528238867911-skdsf46rc72s3u92k6c4meciqrk3pmqh.apps.googleusercontent.com"
                                    render={(renderProps) => (
                                        <NavBtnLink to='/sign-in'>
                                            <Button fontBig primary>Log In</Button>
                                        </NavBtnLink>
                                    )}
                                    buttonText="구글 계정으로 로그인"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={"single_host_origin"}
                                    isSignedIn={true}
                                />
                            )}
                        </NavItemBtn>
                    )}
                </NavMenu>
            </NavbarContainer>
        </Nav> 
    );
}

export default Navbar;