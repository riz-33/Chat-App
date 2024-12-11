import React, { useContext, useRef } from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import 'mdb-ui-kit/css/mdb.min.css';
import User from '../context/user';
import * as mdb from 'mdb-ui-kit'; // lib
window.mdb = mdb;

function UpdateProfile() {
    const user = useContext(User).user

    return (
        <section style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer style={{ paddingTop: '3rem', paddingBottom: '1.5rem' }} >
                <MDBRow className='justify-content-center align-items-center'>
                    <MDBCol lg="8" className="mb-2 mb-lg-0">
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href='chatapp'>Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href="myprofile">My Profile</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>Update Profile</MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol lg="8" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    // onClick={uploadImage}
                                    src={user.photo}
                                    alt="avatar"
                                    className="rounded-circle mb-3"
                                    style={{ width: '150px', cursor: 'pointer' }}
                                    fluid />
                                {/* <p className="text-muted mb-1">Full Stack Developer</p> */}
                                <p className="text-muted mb-3">Bay Area, San Francisco, CA</p>
                                <div className="d-flex justify-content-center mb-3">
                                    {/* <MDBBtn onClick={uploadImageToFirestore}>Update Image</MDBBtn> */}
                                    <MDBBtn outline className="ms-1">Update Profile</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard className="mb-3">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Full Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.username}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                {/* <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Phone</MDBCardText>
                                    </MDBCol> */}
                                {/* <MDBCol sm="9"> */}
                                {/* <MDBCardText className="text-muted">{user.number}</MDBCardText> */}
                                {/* </MDBCol> */}
                                {/* </MDBRow> */}
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Mobile</MDBCardText>
                                        {/* <label class="form-label" for="form8Example2">Email address</label> */}
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{user.number}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                {/* <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Address</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                                    </MDBCol>
                                </MDBRow> */}
                            </MDBCardBody>
                        </MDBCard>

                        <MDBCard>
                            <MDBCardBody className="p-0">
                                <MDBListGroup flush className="rounded-3">
                                    {/* <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fas icon="globe fa-lg text-warning" />
                                        <MDBCardText>https://mdbootstrap.com</MDBCardText>
                                    </MDBListGroupItem> */}
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                                        <MDBCardText>
                                            <a href="https://github.com/riz-33"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                riz-33
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="whatsapp fa-lg" style={{ color: '#25D366' }} />
                                        <MDBCardText>
                                            <a href="https://wa.me/+923328293125"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                +923328293125
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                                        <MDBCardText>
                                            <a href="https://www.instagram.com/rizwan.herre/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                rizwan.herre
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                                        <MDBCardText>
                                            <a href="https://www.facebook.com/muhammad.rizwan993"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                muhammad.rizwan993
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="linkedin fa-lg" style={{ color: '#0077b5' }} />
                                        <MDBCardText>
                                            <a href="https://www.linkedin.com/in/muhammad-rizwan-quettawala-1a462b18b"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                in/muhammad-rizwan-quettawala-1a462b18b
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="envelope fa-lg" style={{ color: '#D14836' }} />
                                        <MDBCardText>
                                            <a href="mailto:rizwan.quettawala@gmail.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                rizwan.quettawala@gmail.com
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                    <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                                        <MDBIcon fab icon="youtube fa-lg" style={{ color: '#FF0000' }} />
                                        <MDBCardText>
                                            <a href="https://www.youtube.com/channel/UCXDqo26MM7IN_La4OdRBWxQ"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                channel/UCXDqo26MM7IN_La4OdRBWxQ
                                            </a>
                                        </MDBCardText>
                                    </MDBListGroupItem>
                                </MDBListGroup>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default UpdateProfile;