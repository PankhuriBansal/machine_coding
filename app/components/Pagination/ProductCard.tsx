
const ProductCard = ({image, title}) => {
    return <div className = "product-card">
        <img src = {image} alt={title} className = "product-img"/>
        <span className = "">{title}</span>
    </div>
}

export default ProductCard