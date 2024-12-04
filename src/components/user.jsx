import React, { useContext, useEffect } from 'react';
import {
    MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon
} from 'mdb-react-ui-kit';
import { db, doc, getDoc } from '../config/firebase';
import User from '../context/user';


function UserProfile() {
    const getUser = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const user = useContext(User).user
    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage src={user.photo}
                                        alt="Avatar" className="rounded-circle my-4" style={{ width: '100px' }} fluid />
                                    <MDBTypography tag="h5">{user.username}</MDBTypography>
                                    <MDBCardText>Web Designer</MDBCardText>
                                    <MDBIcon style={{ cursor: 'pointer' }} far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="12" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                            </MDBCol>
                                            {/* <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">123 456 789</MDBCardText>
                                            </MDBCol> */}
                                        </MDBRow>

                                        {/* <MDBTypography tag="h6">Information</MDBTypography>
                                        <hr className="mt-0 mb-4" /> */}
                                        <MDBRow className="pt-1">
                                            {/* <MDBCol size="6" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">info@example.com</MDBCardText>
                                            </MDBCol> */}
                                            <MDBCol size="12" className="mb-4">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{user.number}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <div className="d-flex justify-content-start">
                                            <a href={user.facebook} target='blank' rel="noopener noreferrer">
                                                <MDBIcon fab icon="facebook me-3 fa-lg" style={{ color: '#3b5998' }} />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="instagram me-3 fa-lg" style={{ color: '#ac2bac' }} />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="github me-3 fa-lg" style={{ color: '#333333' }} />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="whatsapp me-3 fa-lg" style={{ color: '#25D366' }} />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="linkedin me-3 fa-lg" style={{ color: '#0077b5' }} />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="envelope me-3 fa-lg" style={{ color: '#D14836' }} />
                                            </a>
                                            <a href="#!">
                                                <MDBIcon fab icon="youtube me-3 fa-lg" style={{ color: '#FF0000' }} />
                                            </a>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default UserProfile;