export const validateProps = props => {
    if(props.pageSize && props.pageSize<=0){
        return "Invaild pageSize prop"
    }
    if(props.thresholdPageCount && props.thresholdPageCount<3){
        return "Threshold too small, no need for infinite scroll"
    }

    return "SUCCESS"
}