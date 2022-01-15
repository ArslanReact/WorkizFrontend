import React from 'react';
import { Form, Nav, Button } from 'react-bootstrap';

// componet import
import CommentLoop from "../blog/CommentLoop";

// images import
import banner_image from "../../../assets/images/website/wallpaper_img.svg";
import avatar_01 from "../../../assets/images/website/avatar_1.svg";

const BlogDetail = () => {
    const CommentLoopArray = [
        {
            key: "0",
            avatar_img: avatar_01,
            title: "Richard Muldoone",
            date: "Jul 28, 2021 - 08:07 pm",
            paragraph: "The example about the mattress sizing page you mentioned in the last WBF can be a perfect example of new keywords and content, and broadening the funnel as well. I can only imagine the sale numbers if that was the site of a mattress selling company.",
        },
        {
            key: "1",
            avatar_img: avatar_01,
            title: "Richard Muldoone",
            date: "Jul 28, 2021 - 08:07 pm",
            paragraph: "The example about the mattress sizing page you mentioned in the last WBF can be a perfect example of new keywords and content, and broadening the funnel as well. I can only imagine the sale numbers if that was the site of a mattress selling company.",
        },
    ]
    return (
        <>
            <div className="top_banner py-5 text-center">
                <h5>Blog Detail</h5>
            </div>
            {/*  */}
            <div className="py-5">
                <div className="col-10 col-xl-8 mx-auto blog">
                    <div className="card border_0">
                        <div className="text-center"><img className="w-100 img-fluid border_radius_5" src={banner_image} alt="review_banner" /></div>
                        <div className="card-body px-0">
                            <h4 className=""><Nav.Link href="#" className="p-0 drkblue_text_color">Cloud, containerization and the digital bank of the future</Nav.Link></h4>
                            <p className="seablue_text_color fontsize16 fontweightbold">By Amardeep Johar and Arul Rajkumar -July 23, 2021</p>
                            <div className="mb-4">zxc</div>
                            <p>Banks are continuing their cloud transformation as they modernize legacy systems and provide more self-serve experiences to customers through mobile channels. This has become even more important over the past year as we deal with the pandemic.</p>
                            <p>Fintechs and app-based ‘challenger’ banks are already using cloud-native technologies to connect with customers. While legacy banks need to keep up with new competitors, consumer expectations and emerging technologies, they must also meet strict regulatory and compliance requirements, particularly when it comes to security and privacy.</p>
                            <p>The events of 2020 have been a catalyst for change, accelerating innovation and cutting through regulatory inertia. Key findings from our global Harvey Nash / KPMG CIO Survey 2020 found that almost half (47 per cent) of respondents say the pandemic has permanently accelerated digital transformation and the adoption of emergent technologies; and they’re prioritizing spend on cloud infrastructure, security and privacy.</p>
                            <h5 className=""><Nav.Link href="#" className="p-0 drkblue_text_color">Managing risk in the cloud</Nav.Link></h5>
                            <p>For legacy banks, when it comes to security and privacy, one of their biggest challenges is managing risk in the cloud. There are several cloud-related standards and best practices that address this, such as those from NIST and ISO. A keystone in their adoption strategy is to assure standards compliance through automation – in this model, cloud platform engineers automate the necessary preventive and detective controls at an infrastructure level. This approach unburdens lines of business from complex infrastructure security requirements so they can focus on developing enhanced customer experiences. Much of the infrastructure level compliance then becomes a by-product of their consumption.</p>
                            <p>The problem is, automated security engineering is complex and if we don’t understand the risk, we don’t take the risk. Centralized technology organizations within banks need to be in sync with their internal risk control partners, but they’re typically set up more like church and state. Yet, the threat landscape is evolving so quickly that if you’re not agile with your cloud adoption, you may find that six months into your journey, something that was initially deemed secure is no longer considered secure enough.</p>
                            <p>That’s why it’s important to choose the right strategic build candidates for your cloud program. Focus investments on building a foundation for these visible initiatives and grow incrementally from there. This isn’t easy; the longer you’re at it, the more things change, and the more expensive it gets. We’re also seeing an evolution of cloud itself from hybrid to multi-cloud environments.</p>
                            <h6 className=""><Nav.Link href="#" className="p-0 drkblue_text_color">The role of containerization</Nav.Link></h6>
                            <p>If you’re a CIO, you can’t ignore multi-cloud and hybrid considerations. You need portability, agility  but you also want to de-risk vendor lock-in. Container platform strategies are now the go-to to achieve this outcome. However, flexibility historically comes at a price, and true portability often means avoiding the use of managed platform-as-a-service (PaaS) solutions specific to each major cloud provider.</p>
                            <p>For example, if you’re using containerization for portability, are you going to be forced to containerize services that are actively being commoditized and then manage them yourself on a platform that is foreign to your current workforce? A hybrid approach may be a viable alternative. Here, you’re selectively locking in where switching costs may be low.</p>
                            <p>You’ll have to ask yourself whether your business case can be achieved at scale and if containerization serves your purpose. Coming up with a framework to make those decisions is essential. Ultimately, CIOs are seeking clarity to find that right balance between being platform agnostic and driving a positive return on investment.</p>
                            <h4 className=""><Nav.Link href="#" className="p-0 drkblue_text_color">Meeting regulatory compliance in the cloud</Nav.Link></h4>
                            <p>Banks must ensure regulatory compliance in the cloud, including customer-centric procedures such as Know Your Customer (KYC) to assess risk and comply with anti-money laundering (AML) laws. </p>
                            <p>KYC in the traditional sense means going into the branch and showing three pieces of ID. But, the ability to automate this process – and reduce face-to-face interactions – is becoming increasingly important, especially since challenger banks are already doing this.</p>
                            <p>The next-generation capabilities becoming readily available through cloud service models can make automating KYC and AML easier. However, their adoption is predicated on being able to manage the risks effectively, harness next-generation platforms and integrate these new capabilities into legacy processes. Financial data is sensitive, and from a regulatory perspective, the stakes are high for banks when running a use case like this in a cloud environment. </p>
                            <p>Self-serve is the future of the industry. But, can you take some of your most-important processes, including Know Your Customer (KYC), and turn them into self-serve options in the cloud? Consider the risks you’re taking on and what the roadmap will look like in terms of time frames and investment dollars. An organization’s maturity will significantly influence the degree to which automation can be applied to important problems, especially ones that are labour-intensive (and not necessarily differentiating).</p>
                            <div className="mt-4">
                                <h4 className="drkblue_text_color">2 Comments</h4>
                                <ul className="list-unstyled mt-5 comment">
                                    {CommentLoopArray.map((val) => {
                                        return (
                                            <CommentLoop
                                                key={val.key}
                                                avatar_img={val.avatar_img}
                                                title={val.title}
                                                date={val.date}
                                                paragraph={val.paragraph}
                                            />
                                        )
                                    })}
                                </ul>
                            </div>
                            {/*  */}
                            <div className="paragraph_grey2_bg_color mt-4 border_radius_10">
                                <div className="card-body p-4">
                                    <h6 className="drkblue_text_color mb-4 fontsize18 fontweightbold">Request A Quote</h6>
                                    <div className="row">
                                        <div className="col-xl-6 col-lg-12 mb-4">
                                            <Form.Group>
                                                <Form.Control type="text" className="h-70px" name="" placeholder="Name"></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-xl-6 col-lg-12 mb-4">
                                            <Form.Group>
                                                <Form.Control type="email" className="h-70px" name="" placeholder="Email"></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 mb-4">
                                            <Form.Group>
                                                <Form.Control type="text" className="h-70px" name="" placeholder="Website"></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 mb-4">
                                            <Form.Group>
                                                <Form.Control as="textarea" rows={5} className="" name="" placeholder="Comment"></Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div className="col-xl-12 col-lg-12 mb-4">
                                            <div className="d-flex align-items-center">
                                                <Form.Check type="radio" className="me-3" name="radio" aria-label="radio 1" />
                                                <p className="m-0 drkblue_text_color">Save my name, email, and website in this browser for the next time I comment.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button type="button" className="px-3 fontsize16 btnweb">Submit Comment</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetail;
