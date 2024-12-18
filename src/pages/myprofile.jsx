import React, { useContext } from 'react';
import {
    MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon,
    MDBBreadcrumb, MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import User from '../context/user';
import { useNavigate, useSearchParams } from 'react-router-dom';

function MyProfile() {
    const navigate = useNavigate()
    const searchParams = useSearchParams()
    const user = useContext(User).user
    const editProfile = () => {
        console.log("Button clicked!");
        navigate(`/updateprofile?${user.uid}`)
    };

    return (
        <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
            <MDBContainer className="py-5 h-100">
                <MDBRow className='justify-content-center align-items-center'>
                    <MDBCol lg="8" className="mb-4 mb-lg-0">
                        <MDBBreadcrumb className="bg-light rounded-3 p-3">
                            <MDBBreadcrumbItem>
                                <a href='chatapp'>Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem active>My Profile</MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href="updateprofile">Update Profile</a>
                            </MDBBreadcrumbItem>
                        </MDBBreadcrumb>
                    </MDBCol>
                </MDBRow>

                <MDBRow className="justify-content-center align-items-center">
                    <MDBCol lg="8" className="mb-2 mb-lg-0">
                        <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom text-center text-white"
                                    style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                    <MDBCardImage src={user.photo || user.photo !== null ? user.photo :
                                        `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp`}
                                        alt="Avatar" className="rounded-circle my-4" style={{ width: '100px' }} fluid />
                                    <MDBTypography tag="h5">{user.username}</MDBTypography>
                                    <MDBCardText>{user.bio || "Enter Bio"}</MDBCardText>
                                    <MDBIcon
                                        style={{ cursor: 'pointer' }}
                                        far
                                        icon="edit mb-5"
                                        onClick={editProfile}
                                    />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">User Information</MDBTypography>
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="12" className="mb-3">
                                                <MDBTypography tag="h6">Email</MDBTypography>
                                                <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow className="pt-1">
                                            <MDBCol size="12" className="mb-4">
                                                <MDBTypography tag="h6">Phone</MDBTypography>
                                                <MDBCardText className="text-muted">{user.number ? user.number :
                                                    "N/A"}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>

                                        <div className="d-flex justify-content-start">
                                            <a href={user.facebook ? user.facebook : "https://www.facebook.com/"}
                                                target='blank' rel="noopener noreferrer">
                                                <MDBIcon fab icon="facebook me-3 fa-lg" style={{ color: '#3b5998' }} />
                                            </a>
                                            <a href={user.instagram ? user.instagram : "https://www.instagram.com"}
                                                target='blank' rel='noopner noreferrer'>
                                                <MDBIcon fab icon="instagram me-3 fa-lg" style={{ color: '#ac2bac' }} />
                                            </a>
                                            <a href={user.github ? user.github : "https://www.github.com"}
                                                target='blank' rel='noopner noreferrer'>
                                                <MDBIcon fab icon="github me-3 fa-lg" style={{ color: '#333333' }} />
                                            </a>
                                            <a href={user.whatsapp ? user.whatsapp : "https://www.whatsapp.com"}
                                                target='blank' rel='noopner noreferrer'>
                                                <MDBIcon fab icon="whatsapp me-3 fa-lg" style={{ color: '#25D366' }} />
                                            </a>
                                            <a href={user.linkedin ? user.linkedin : "https://www.linkedin.com"}
                                                target='blank' rel='noopner noreferrer'>
                                                <MDBIcon fab icon="linkedin me-3 fa-lg" style={{ color: '#0077b5' }} />
                                            </a>
                                            <a href={`mailto: ${user.email}`}
                                                target='blank' rel='noopner noreferrer'>
                                                <MDBIcon fab icon="envelope me-3 fa-lg" style={{ color: '#D14836' }} />
                                            </a>
                                            <a href={user.youtube ? user.youtube : "https://www.youtube.com"}
                                                target='blank' rel='noopner noreferrer'>
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

export default MyProfile;