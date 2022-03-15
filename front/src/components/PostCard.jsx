import React from "react";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const PostCard = () => {

    const { isLoading, error, data } = useQuery('Posts', () =>
     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
       res.json()
     )
   )
   if(data){
       console.log(data)
   }
    return (
        <div className="row">
            <div className="col-lg-6 mx-auto border bg-light">
                <div className="d-flex text-center pb-3 pt-3 ">
                    <div className="pe-2">
                        <img className="rounded-circle" width={54} alt={`profile picuture ${'qsd'}`}
                            src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
                            data-holder-rendered="true" />
                    </div>
                    <div className="d-flex flex-column ms-2">
                        <div className="text-start">
                            <Link className="fw-bold text-capitalize" to="/user">{`${'John'} ${'Doe'}`}</Link>
                        </div>
                        <a className="text-decoration-none" href="">
                            <p className="me-4 mt-1 text-break text-body text-start">qqsdqsdqsdqsdsdqsdqsdqdqdqsdqsdqdqsdqsdqdqdqsdqsqdsqsdqsdqsdqsdqsdqdqdqsdqsdqdqdqsdqs</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;