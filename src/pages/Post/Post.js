import React from "react";

export default function Post() {
    return (
      <div className={"qaRecord"}>
		
        <Comment style={{marginTop:'-20px'}}
          actions={actions}
          author={<a>{this.props.critic}</a>}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={<p>{this.props.content}</p>}
   
          datetime={longToDate(this.props.time)}

          className={styles.customComment}         
        >         

          {this.state.isShowReply ? (
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={this.state.submitting}
            />
          ) : (
            <div></div>
          )}

          {/* 显示回复 */}
          {this.props.children}
        </Comment>
      </div>
    );
  }
}
}
