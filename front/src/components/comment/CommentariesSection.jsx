import React from "react";
import { Link } from "react-router-dom";
import UserPopOver from '../post/UserPopOver';
import MoreOptionsMenu from '../MoreOptionsMenu';
import MediaType from '../MediaType';
import defautlAvatar from '../../assets//img/d-avatar.svg';
import { dateDiff } from '../../services/outils/dateHandler';

const CommentariesSection = ({ commentaries = [] }) => {
    return (
        <>
            {commentaries.map((comment, key) => {
                return (
                    <div key={key} className="border-start border-end border-bottom border-1 pt-4 pb-5 bg-light-hover">
                        <div className="d-flex position-relative">
                            <div className="pe-2">
                                <Link to={`../user/${comment.User.id}`}
                                    className="d-block overflow-auto "
                                    data-popover="true" >
                                    <img className="rounded-circle border border-3" width={54} alt={`photo de profile de ${comment.User.firstName} ${comment.User.lastName}`}
                                        src={comment.User.profilePicture || defautlAvatar}
                                        data-holder-rendered="true" />
                                </Link>
                            </div>
                            <div className="d-flex flex-column ms-2">
                                <div className="text-start pb-3">
                                    <Link to={`../user/${comment.User.id}`}
                                        className="fw-bold text-capitalize link-dark"
                                        data-popover="true">

                                        {`${comment.User.firstName} ${comment.User.lastName}`}
                                    </Link>
                                    <div className="d-inline text-muted fs-6 ps-2"><small>- {dateDiff(comment.createdAt)}</small></div>
                                    <UserPopOver id={comment.User.id} user={comment.User} />
                                </div>
                                <MoreOptionsMenu postId={comment.id} postUserId={comment.User.id} />
                                <div className=" text-decoration-none">
                                    <p className="pe-4 pb-3 m-0 text-break text-body text-start">{comment.content}</p>
                                </div>
                                {comment.media && (
                                    <MediaType mediaType={comment.mediaType} media={comment.media} id={comment.id} />
                                )}
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </>
    )
}

export default CommentariesSection;